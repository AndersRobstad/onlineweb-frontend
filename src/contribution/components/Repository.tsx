import React from 'react';
import { IRepository } from '../models/Repository';
import ReactMarkdown from 'react-markdown';

const Repository = ({ name, description, url }: IRepository) => {
    return (
        <div>
            <img alt={name} />
            <span>
        <h3>{name}</h3>
        <ReactMarkdown source={description} />
      </span>
        </div>
    );
};

export default Repository;
