import React, { useState } from "react";
import './Currency.css';
import { Container, Row, Col} from 'reactstrap';
import Cow from '../../shared/Cow';
import Table from '../../shared/Table';


const Currency= () => {

  const [averagePriceVND, setAveragePriceVND] = useState("");

  const handleAveragePriceChange = (averagePrice) => {
    setAveragePriceVND(averagePrice);
  };

  return <section className='currency'>
    <Container>
        <Row>
            <Col lg='7'>
              <Table onAveragePriceChange={handleAveragePriceChange} />
            </Col>
            <Col lg='3'> 
              <Cow averagePriceVND={averagePriceVND} />
            </Col>
        </Row>
    </Container>
  </section>
    
  
}

export default Currency