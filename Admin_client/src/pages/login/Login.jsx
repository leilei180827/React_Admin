import React from "react";
import "./login.less";
import logo from "../../assets/img/logo.png";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { LOGIN } from "../../actions/types";
import { login_network } from "../../network/login";
function Login(props) {
  const onFinish = (values) => {
    login_network(values)
      .then(({ data }) => {
        if (data.success) {
          !props.token &&
            props.login_reducer({
              token: data.token,
              user: { ...data.user, menus: data.permissions },
            });
          props.history.replace("/admin");
        } else {
          message.error(data.message);
        }
      })
      .catch((error) => message.error(error.toString()));
  };
  const rules = [
    {
      required: true,
      whitespace: true,
      message: "Please input your Username!",
    },
    { min: 4, message: "At least 4 characters" },
    { max: 12, message: "At most 12 characters" },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: "Only letters,numbers and underscore are valid",
    },
  ];
  return (
    <div id="login">
      <header className="login-header">
        <img src={logo} alt="logo" />
        <span className="first-title">React Program - Admin System</span>
      </header>
      <section className="login-section">
        <span className="second-title">Welcome</span>
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item name="username" rules={rules} validateTrigger={false}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item name="password" rules={rules} validateTrigger={false}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
}
const mapStateToProps = (state) => ({
  token: state.user.token,
});
const mapDispatchToProps = (dispatch) => {
  return {
    login_reducer: (user) => dispatch({ type: LOGIN, payload: user }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
