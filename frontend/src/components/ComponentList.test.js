import React from 'react';
import mockAxios from 'axios';
import { render, unmountComponentAtNode } from 'react-dom';
import { mount } from 'enzyme';

import ComponentList from './ComponentList';

jest.mock('axios')

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders without crashing', async () => {
  const map = {
    "id": 1,
    "ref": "/api/components/1/",
    "title": "Asian Cultural Council records",
    "children":
      [
        {
            "id": 1,
            "title": "Asian Cultural Council records, Administrative Files, RG 1",
            "ref": "/api/components/1/",
            "parent": null,
            "archivesspace_uri": "/repositories/2/resources/626",
            "tree_index": 0
        },
        {
            "id": 2,
            "title": "Asian Cultural Council records, Conferences, Festivals and Seminars, RG 2",
            "ref": "/api/components/2/",
            "parent": null,
            "archivesspace_uri": "/repositories/2/resources/12464",
            "tree_index": 1
        }
    ],
    "publish": false,
    "created": "2019-11-04T16:16:08.934112-05:00",
    "modified": "2019-11-04T16:19:27.215211-05:00"
  }

  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({data: map})
  );
  const params = {
    params: {id: 1}
  }
  const wrapper = await mount(<ComponentList activeMap={map} items={map.children} onChange={function(){}} />);
  const instance = await wrapper.instance();
});
