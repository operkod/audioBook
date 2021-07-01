import { Spin } from 'antd'

const style = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%'
}

const Loader = () => (
	<div className='loader' style={style}>
		<Spin size='large' />
	</div>
)
export default Loader
