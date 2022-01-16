import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import bcrypt from "bcryptjs";
import React from 'react';

import { useMutation } from '@apollo/react-hooks';
import { SIGNUP_MUTATION } from "../graphql";

const formItemLayout = {
  labelCol: {
    xs: { span: 24},
    sm: { span: 8},
  },
  wrapperCol: {
    xs: { span: 24},
    sm: { span: 24},
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0},
    sm: { span: 24, offset: 10},
  },
};

const SignUp = ({displayStatus, username, setUsername, hashedPassword, setHashedPassword}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  // sendSignUp({username: username, password: hashedPassword})
  const [singUp] = useMutation(SIGNUP_MUTATION);
  const sendSignUp = async ({ username, password }) => {
    console.log(username, password)
    const { data } = await singUp({
      variables: {
        password, username
      }
    });
    console.log(data);
    displayStatus(data.signUp);
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      size="large"
    >
      <Form.Item
        name="Username"
        label="Username"
        rules={[{ required: true, message: 'Please input your Username!'}]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} onChange={(e) => setUsername(e.target.value)}/>
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your password!'}]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon"/>}/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[{required: true, message: 'Please confirm your password!'},
          ({ getFieldValue }) => ({
            async validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                // console.log(value);
                const hash = await bcrypt.hash(value, 10);
                // console.log(hash);
                setHashedPassword(hash);
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}/>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" size="middle" onClick={
          async () => {
            if (form.getFieldValue('password') === form.getFieldValue('confirm')){
              await sendSignUp({username: username, password: hashedPassword});  
            }
          }}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
