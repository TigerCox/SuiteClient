import React, {PropTypes} from 'react';

import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const FieldGroup = ({ id, label, className, validation, help, ...props }) => {
  return (
    <FormGroup className={className} controlId={id} validationState={validation}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
};

FieldGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  validation: PropTypes.string,
  help: PropTypes.string
};

export default FieldGroup;
