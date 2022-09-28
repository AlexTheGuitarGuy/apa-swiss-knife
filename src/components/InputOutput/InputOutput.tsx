import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getDisplayText } from '../../redux/fields-reducer/fields-selector'
import { setText } from '../../redux/fields-reducer/fields-reducer'
import NameHeader from '../common/NameHeader/NameHeader'

const InputOutput = () => {
	const displayText = useAppSelector(getDisplayText)

	const dispatch = useAppDispatch()

	return (
		<div
			className='w-full 
						flex flex-col
						divide-y-2 h-screen'
		>
			<NameHeader text={'Input'} />
			<textarea
				placeholder='introduce text'
				onChange={(event: any) => {
					dispatch(setText(event.target.value))
				}}
				className='h-full p-1 
				resize-none focus:outline-gray-400'
			/>

			<NameHeader text={'Output'} />
			<div className='h-full p-1 break-words overflow-y-scroll'>
				{displayText || 'result will be shown here'}
			</div>
		</div>
	)
}

export default InputOutput
