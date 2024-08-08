import React from 'react';
import './Currency.css';
import { Container, Row, Col} from 'reactstrap';
import Cow from '../../shared/Cow';
import { Tab } from 'bootstrap';
import Table from '../../shared/Table';


const Currency= () => {
  return <section className='currency'>
    <Container>
        <Row>
            <Col lg='7'>
              <Table/>
            </Col>
            <Col lg='3'> 
                <Cow />
            </Col>
        </Row>
    </Container>
  </section>
    
  
}

export default Currency