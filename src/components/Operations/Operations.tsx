import OperationCard from './OperationCard/OperationCard'
import { fieldsActions, transformText } from '../../redux/fields-reducer/fields-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getOperationsMap } from '../../redux/fields-reducer/fields-selector'
import { ReactNode } from 'react'

const Operations = () => {
	const operationsMap = useAppSelector(getOperationsMap)

	const dispatch = useAppDispatch()

	const operationButtons: ReactNode[] = []

	for (const [key, value] of Object.entries(operationsMap)) {
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

	return <div className='w-full flex flex-col'>{operationButtons}</div>
}

export default Operations
