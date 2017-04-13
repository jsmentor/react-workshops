import React from 'react';
import Layout from '../components/Layout';
import WorkshopsPage from '../components/WorkshopsPage';
import mockEpisodes from '../mock/episodes.json';

export default () => (
  <Index />
)

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      episodes: []
    };
  }

  loadEpisodes = () => {
    this.setState({
      episodes: _.clone(mockEpisodes)
    });
  };

  render(){
    const { episodes } = this.state;
    return (
      <Layout>
        <WorkshopsPage title="React Workshops" episodes={episodes} />
        <br/>
        <br/>
        <button onClick={this.loadEpisodes}>Load mock episodes2!</button>
      </Layout>
    );
  }
}