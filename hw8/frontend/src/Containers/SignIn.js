import { Input, Button, Form } from "antd";
import { UserOutlined, LockOutlined} from "@ant-design/icons";
import crypto from "crypto-js";
const secretKey = 'password';

const SignIn = ({setSignedIn, sendLogin, username, setUsername, hashedPassword, setHashedPassword }) => {
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

    const [form] = Form.useForm();
    form.setFieldsValue({Username: username});

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
    <>
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
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} onChange={
          async (e) => {
            const encrypted = await crypto.AES.encrypt(e.target.value, secretKey).toString();
            setHashedPassword(encrypted);
          }}/>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" size="middle" onClick={
          async () =>{
          await sendLogin({username: username, password: hashedPassword, secretKey: secretKey});
            // setSignedIn();
          }}>
          Log In
        </Button>
      </Form.Item>
    </Form>



    </>
)};
export default SignIn;
