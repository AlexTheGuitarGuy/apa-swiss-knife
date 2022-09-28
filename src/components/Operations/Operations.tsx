import OperationCard from './OperationCard/OperationCard'
import { fieldsActions, transformText } from '../../redux/fields-reducer/fields-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getOperationsMap } from '../../redux/fields-reducer/fields-selector'
import { ReactNode, useState } from 'react'
import NameHeader from '../common/NameHeader/NameHeader'

const Operations = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const operationsMap = useAppSelector(getOperationsMap)

	const dispatch = useAppDispatch()

	const operationButtons: ReactNode[] = []

	for (const [key, value] of Object.entries(operationsMap)) {
		if (key.includes(searchTerm))
			operationButtons.push(
				<OperationCard
					key={key}
					text={key}
					operation={() => {
						dispatch(fieldsActions.pushToOperations(value))
						dispatch(transformText())
					}}
				/>,
			)
	}

	return (
		<div className='w-full flex flex-col'>
			<NameHeader text={'Operations'} />
			<input
				placeholder='Search...'
				className='focus:outline-gray-400 p-4 border-b border-gray-300'
				onChange={(event) => setSearchTerm(event.target.value)}
			/>
			{operationButtons.length ? (
				operationButtons
			) : (
				<div className='text-gray-600 p-4'>{`There are no operations which include "${searchTerm}" :(`}</div>
			)}
		</div>
	)
}

export default Operations
