import React from 'react';
import _ from 'lodash';
import mockEpisodes from '../../mock/episodes.json';

const mockEpisodes2 = _.clone(mockEpisodes);

export default class WorkshopsPage extends React.Component {
  static defaultProps = {
    title: 'React Workshops',
    episodes: []
  };

  constructor(props) {
    super(props);
    console.info('Mounting 1. lifecycle method: constructor');

   const {episodes = []} = props;
    this.state = {
      episodes
    };
  }

  componentWillMount(){
    console.info('Mounting 2. lifecycle method: componentWillMount');
  }

  loadEpisodes = () => {
    this.setState({
      episodes: mockEpisodes
    });
  };

  componentDidMount = () => {
    console.info('Mounting 4. lifecycle method: componentDidMount');
  };

  componentWillUnmount = () => {
    console.info('Unmounting 1. lifecycle method: componentWillUnmount');
  };

  componentWillReceiveProps = (nextProps) => {
    const {episodes} = nextProps;
    console.log('Updating 1. lifecycle method: componentWillReceiveProps > nextProps: ', nextProps);

    this.setState({
      episodes
    });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    const {episodes = []} = nextState;
    console.log('Updating 2. lifecycle method: shouldComponentUpdate');
    return episodes !== mockEpisodes;
  };

  componentWillUpdate = () => {
    console.log('Updating 3. lifecycle method: componentWillUpdate');
  };

  componentDidUpdate = () => {
    console.log('Updating 5. lifecycle method: componentDidUpdate');
  };

  render() {
    const {title} = this.props;
    const {episodes = []} = this.state;

    console.info('Mounting 3. lifecycle method: render');
    console.log('Updating 4. lifecycle method: render');

    return (
      <div>
        <div>{title}</div>
        <br/>
        {
          episodes.length ? (
            <div>
              Episodes:
              <ul>
                {episodes.map((episode, index) => (
                  <li key={index}>{episode.name}</li>
                ))}
              </ul>
            </div>
          ) : (
            <span>No episodes has been shared yet!</span>
          )
        }
        <br/>
        <br/>
        <button onClick={this.loadEpisodes}>Load mock episodes1!</button>
      </div>
    );
  }
}