import React from 'react';
import { Form, Card, Input, Button } from 'antd';

const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8 },
};

const formTailLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 8, offset: 4 },
};

function Edit(props) {
	const [form] = Form.useForm();
	const onCheck = async () => {
		try {
			const values = await form.validateFields();
			console.log('Success:', values);
		} catch (errorInfo) {
			console.log('Failed:', errorInfo);
		}
	};
	const onFinish = values => {
		console.log(values);
	};
	const validatePrice = (rule, value) =>{
		return new Promise(async (resolve, reject) => {
			if (!value){
				await reject('Price is required!')
			}else if(value > 200) {
                await reject('The price is less than 200.')
            }else {
                await resolve()
            }
        })
	}
	return (
		<Card title="Edit">
			<Form form={form} onFinish={onFinish}>
				<Form.Item
					{...formItemLayout}
					name="name"
					label="Name"
					rules={[
						{
							required: true,
							message: 'Please input product name.',
						},
					]}><Input placeholder="Please input product name." /></Form.Item>
				<Form.Item {...formItemLayout} name='price' label="Price"
					rules={[
						{
							required: true,
							validator: validatePrice,
						},
					]}><Input placeholder="Please input product price." /></Form.Item>
				<Form.Item {...formTailLayout}><Button htmlType="submit" type="primary" onClick={onCheck}>Save</Button></Form.Item>
			</Form>
		</Card>
	)
}

export default Edit
