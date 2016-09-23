import React, {PropTypes} from 'react';

import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

const FieldGroup = ({ id, label, className, validation, ...props }) => {
  return (
    <FormGroup className={className} controlId={id} validationState={validation === null ? null : validation === "" ? "success" : "error"}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {validation && <HelpBlock>{validation}</HelpBlock>}
    </FormGroup>
  );
};

FieldGroup.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  validation: PropTypes.string
};

export default FieldGroup;
