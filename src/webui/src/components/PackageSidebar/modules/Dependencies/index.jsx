import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Module from '../../Module';

import classes from './style.scss';
import {getDetailPageURL} from '../../../../../utils/url';
import ModuleContentPlaceholder from '../../ModuleContentPlaceholder';

export default class Dependencies extends React.Component {
  static propTypes = {
    packageMeta: PropTypes.object.isRequired
  };

  get dependencies() {
    return get(this, 'props.packageMeta.latest.dependencies', {});
  }

  render() {
    let dependencies = this.dependencies;
    let dependenciesList = Object.keys(dependencies);

    if (!dependenciesList.length) {
      return <ModuleContentPlaceholder text="Zero Dependencies!"/>;
    }

    return (
      <Module
        title="Dependencies"
        className={classes.dependenciesModule}
      >
        <ul>
          {
            dependenciesList.map((dependenceName, index) => {
              return (
                <li className="dependency-item" key={index} title={`Depend on version: ${dependencies[dependenceName]}`}>
                  <a href={getDetailPageURL(dependenceName)}>{dependenceName}</a>
                  {index < dependenciesList.length - 1 && <span>,&nbsp;</span>}
                </li>
              );
            })
          }
        </ul>
      </Module>
    );
  }
}
