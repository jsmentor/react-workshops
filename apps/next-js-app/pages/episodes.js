import React from 'react'
import Layout from '../components/Layout';
import WorkshopsPage from '../components/WorkshopsPage';
import mockEpisodes from '../mock/episodes.json';
import _ from 'lodash';

export default () => (
  <Layout>
    <WorkshopsPage title="React Episodes" episodes={_.clone(mockEpisodes)} />
  </Layout>
)