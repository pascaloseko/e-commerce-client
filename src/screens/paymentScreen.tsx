import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../Components/formContainer';
import CheckoutSteps from '../Components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';
import { useAppSelector } from '../hooks/rootState';
import { RootState } from '../store/store';

const PaymentScreen: React.FC = () => {
  const cart = useAppSelector((state: RootState) => state.cart);
  const { shippingAddress } = cart;
  const history = useNavigate();

  if (!shippingAddress.address) {
    history('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    savePaymentMethod(paymentMethod);
    history('/placeorder'); // Redirect to placeorder page after submitting payment method
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary' className="mt-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
