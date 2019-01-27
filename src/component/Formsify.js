import React from 'react'
import {Form,Input,Button} from 'antd'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
}

export default class Formsify extends React.Component {
  state={}
  componentDidMount() {

  }
  handleChange=(k,v)=>{
    const {onChange,value={}} = this.props
    if (typeof(onChange)==='function') {
      value[k] = v
      onChange(value)
    }
  }
  render() {
    const {onSubmit,list,className,submitLabel,value={}} = this.props
    return (
      <Form onSubmit={onSubmit} className={`login-form ${className||''}`}>
        {
          Array.isArray(list)&&list.length>0&&
          list.map((e,i)=>{
            const {key,label,placeholder,type} = e
            return (
              <Form.Item
                key={i}
                {...formItemLayout}
                label={label}
              >
                <Input
                  type={type||'text'}
                  placeholder={placeholder}
                  value={value[key]}
                  onChange={event=>{
                    const {value} = event.target
                    this.handleChange(key,value)
                  }}
                />
              </Form.Item>
            )
          })
        }
        <Form.Item
          wrapperCol={{ span: 12, offset: 5 }}
        >
          <Button type="primary" htmlType="submit">
            {submitLabel||'Submit'}
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
