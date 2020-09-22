import React from 'react';
import {Form, Card ,Input, Button} from 'antd';

function Edit() {
	return (
		<Card title="Edit the product">
			<Form>
				<Form.Item label="Name"><Input placeholder="Please enter the product name."/></Form.Item>
				<Form.Item label="Price"><Input placeholder="Please enter the product price."/></Form.Item>
				<Form.Item><Button type="primary">Save</Button></Form.Item>
			</Form>
		</Card>
	)
}

export default Edit
