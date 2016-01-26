
import React, {
  Component,
} from 'react';

import Page, {
  Example,
} from '../../components/page/Page.jsx';

import {
  SummaryControl,
  SummaryControlIconCheck,
  SummaryControlIconPaperclip,
} from '../../../framework/framework';

export default class SummaryControlExample extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Page title={this.props.route.name}>
        <Example>
          <SummaryControl
            icon={<SummaryControlIconCheck />}
          >
            Include All Adspaces
          </SummaryControl>
        </Example>

        <Example title="Paperclip icon">
          <SummaryControl
            icon={<SummaryControlIconPaperclip />}
          >
            None Attached
          </SummaryControl>
        </Example>

        <Example title="No icon">
          <SummaryControl>
            No icon
          </SummaryControl>
        </Example>
      </Page>
    );
  }

}
