import { Row, Col } from 'react-bootstrap'

export default function CustomHeader({title, subtitle} : {title: string; subtitle: string;}) {
  return (
    <Row>
      <Col>
        <Row className=''>
          <h3 className="thin-text text-primary mb-0">{title}</h3>
        </Row>
        <Row>
          <p className="thin-text text-secondary">{subtitle}</p>
        </Row>
      </Col>
    </Row>
  );
}
