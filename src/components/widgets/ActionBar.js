<<<<<<< HEAD
import React, {Component, PropTypes} from 'react';
import FontAwesome from 'react-fontawesome';
import { ButtonToolbar, ButtonGroup, Button, Panel } from 'react-bootstrap';

class ActionBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentPanelKey: 0,
      showAdditionalActions: false,
      showIndividualActionPanel: false,
    };

    this.openAdditionalActions = this.openAdditionalActions.bind(this);
  }

  openAdditionalActions(){
    this.setState({
      showAdditionalActions: !this.state.showAdditionalActions,
    });
  }

  openActionsPanel(key){
    const checkLastKey = (this.state.currentPanelKey === key) ? !this.state.showIndividualActionPanel : true;
    this.setState({
      currentPanelKey: key,
      showIndividualActionPanel: checkLastKey,
    });
  }

  doActionButtons(isVisible){
    const { actionButtons } = this.props;
    const self = this;

    const doButtons = actionButtons.map(function(v, key){
      if(isVisible === v.overflow){
        const openActionsPanel = self.openActionsPanel.bind(self, key);
        return(
          <Button key={key} bsStyle="link" className="action-bar__button" onClick={openActionsPanel}>
            <FontAwesome name={v.icon} fixedWidth={true} />
            <span className='hidden-xs'>{v.label}</span>
          </Button>
        );
      }
    });
    return (
      <ButtonGroup>
        {doButtons}
      </ButtonGroup>
    );
  }

  doActionPanel(){
    const { actionButtons } = this.props;
    const actions = actionButtons[this.state.currentPanelKey];
    const actionPanelComponent = actions.actionComponent;

    return(
      <div>
        {actions.label}
        {actionPanelComponent}
      </div>
    );
  }

  render(){
    let visibleActionButtons = this.doActionButtons('visible');
    let hiddenActionButtons = (this.state.showAdditionalActions) ? this.doActionButtons('hidden') : null;
    let doActionPanel = (this.state.showIndividualActionPanel) ? this.doActionPanel() : null;

    return (
      <div className="action-bar">
        <ButtonToolbar className="action-bar__btn-toolbar">
          {visibleActionButtons}
          <div className="action-bar__action-overflow" onClick={this.openAdditionalActions}>
            <Button bsStyle="link" >
              <FontAwesome name='ellipsis-v' fixedWidth={true} />
            </Button>
          </div>
        </ButtonToolbar>
        <ButtonToolbar className="action-bar__btn-toolbar">
          {hiddenActionButtons}
        </ButtonToolbar>
        <Panel className="actions-panel" collapsible expanded={this.state.showIndividualActionPanel}>
          <div>
          {doActionPanel}
            </div>
        </Panel>
      </div>
    );
  }
}

ActionBar.propTypes = {
  actionButtons: PropTypes.object
};
ActionBar.defaultProps = {};

export default ActionBar;
=======
/* eslint-disable react/no-multi-comp */
import React, {PropTypes} from 'react';

const ActionBar = () => {
  return (
    <em>Action bar goes here.</em>
  );
};

export default ActionBar;
/* eslint-enable react/no-multi-comp */
>>>>>>> da6d15bc2efb4c29cd083f40921b7100772c25ea
