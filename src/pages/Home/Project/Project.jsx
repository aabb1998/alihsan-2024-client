import React from 'react';
import { Button } from '../../../components';
import propTypes from "prop-types"

export const Project = (props) => {
    const { project } = props;

    return <div className="transition-all ease-in border rounded-xl bg-neutral-100 border-neutral-300 hover:border-neutral-100 focus:border-primary-300 hover:shadow-card">
        <div className="flex flex-col gap-5 p-5">
            <img src={project.coverImage} className="rounded-xl" alt={project.name} />
            <div>
                <h3 className="mb-3 text-heading-7 sm:heading-6 line-clamp-1">{project.name}</h3>
                <p
									dangerouslySetInnerHTML={{__html: project.description}}
									className="text-sm font-normal line-clamp-2" />
            </div>
            <button className="btn btn-primary filled">Donate Now</button>
        </div>
    </div>;

};

Project.propTypes = {
    project: propTypes.object
}

Project.defaultProps = {
    project: {}
}