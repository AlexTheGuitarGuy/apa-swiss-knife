import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getDisplayText, getInputText } from '../../redux/fields-reducer/fields-selector'
import { setText } from '../../redux/fields-reducer/fields-reducer'
import NameHeader from '../common/NameHeader/NameHeader'
import trashBin from '../../assets/trash-bin.png'

const InputOutput = () => {
	const displayText = useAppSelector(getDisplayText)
	const inputText = useAppSelector(getInputText)

	const dispatch = useAppDispatch()

	return (
		<div
			className='w-full 
						flex flex-col
						divide-y-2 h-screen'
		>
			<NameHeader text={'Input'} extraStyles='flex justify-between'>
				<img
					className='h-6 w-6 hover:cursor-pointer'
					src={trashBin}
					alt='delete all'
					onClick={() => {
						dispatch(setText(''))
					}}
				/>
			</NameHeader>
			<textarea
				placeholder='introduce text'
				onChange={(event: any) => {
					dispatch(setText(event.target.value))
				}}
				value={inputText}
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
