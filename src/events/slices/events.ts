import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError, unwrapResult } from '@reduxjs/toolkit';
import { State } from 'core/redux/Store';
import { getEvent, getEvents, IEventAPIParameters } from 'events/api/events';
import { EventTypeEnum, IEvent } from 'events/models/Event';
import { DateTime } from 'luxon';

const eventsAdapter = createEntityAdapter<IEvent>({
  sortComparer: (eventA, eventB) => {
    return Number(DateTime.fromISO(eventA.event_start) > DateTime.fromISO(eventB.event_start));
  },
});

export const eventSelectors = eventsAdapter.getSelectors<State>((state) => state.events);

export const fetchEvents = createAsyncThunk('events/fetchMultiple', async (options?: IEventAPIParameters) => {
  const events = await getEvents(options);
  return events;
});

export const fetchEventById = createAsyncThunk('events/fetchById', async (eventId: number) => {
  const events = await getEvent(eventId);
  return events;
});

export const fetchEventList = createAsyncThunk('events/fetchList', async (_, { dispatch }) => {
  const response = await dispatch(
    fetchEvents({
      event_end__gte: DateTime.local().toISODate(),
      page_size: 10,
    })
  );
  return unwrapResult(response);
});

export const fetchImageEvents = createAsyncThunk('events/fetchImageEvents', async (_, { dispatch }) => {
  const getTypeEvents = async (types: EventTypeEnum[]) => {
    return await dispatch(
      fetchEvents({
        event_end__gte: DateTime.local().toISODate(),
        event_type: types,
        page_size: 4,
      })
    );
  };
  // Separate the three column fetches to be able to present some columns even if 1 type of events fails.
  const left = getTypeEvents([EventTypeEnum.BEDPRES]);
  const middle = getTypeEvents([EventTypeEnum.KURS]);
  const right = getTypeEvents([
    EventTypeEnum.SOSIALT,
    EventTypeEnum.UTFLUKT,
    EventTypeEnum.EKSKURSJON,
    EventTypeEnum.ANNET,
  ]);
  const responses = await Promise.all([left, right, middle]);
  responses.forEach((payloadCallback) => unwrapResult(payloadCallback));
  return responses;
});

export const fetchEventsByMonth = createAsyncThunk('events/fetchByMonth', async (month: DateTime, { dispatch }) => {
  const firstDayOfMonth = month.minus({ days: month.day - 1 });
  const lastDayOfMonth = firstDayOfMonth.plus({ months: 1 }).minus({ days: 1 });

  /** Set the query parameters of the fetch to the range, set page size large enough to get all */
  const events = await dispatch(
    fetchEvents({
      event_start__gte: firstDayOfMonth.toISODate(),
      event_start__lte: lastDayOfMonth.toISODate(),
      page_size: 60,
    })
  );
  return events;
});

interface IState {
  loading: 'idle' | 'pending';
  error: SerializedError | null;
  entities: Record<number, IEvent>;
}

const INITIAL_STATE: IState = {
  loading: 'idle',
  error: null,
  entities: {},
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState: eventsAdapter.getInitialState(INITIAL_STATE),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = 'pending';
    }),
      builder.addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = 'idle';
        eventsAdapter.addMany(state, action.payload);
      }),
      builder.addCase(fetchEvents.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
      }),
      builder.addCase(fetchEventById.pending, (state) => {
        state.loading = 'pending';
      }),
      builder.addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = 'idle';
        eventsAdapter.addOne(state, action.payload);
      }),
      builder.addCase(fetchEventById.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error;
      });
  },
});

export const eventsReducer = eventsSlice.reducer;
