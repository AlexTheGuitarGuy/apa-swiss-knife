import { FC } from 'react'
import { fieldsActions, transformText } from '../../../redux/fields-reducer/fields-reducer'
import { getKeyByValue } from '../../../utils/object-helpers'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { getOperationsMap } from '../../../redux/fields-reducer/fields-selector'

type CurrentOperationCardProps = {
	operation: string
	index: number
}
const CurrentOperationCard: FC<CurrentOperationCardProps> = ({ operation, index }) => {
	const operationsMap = useAppSelector(getOperationsMap)

	const dispatch = useAppDispatch()

	return (
		<li
			className='bg-green-200 
						py-4 px-8 
						text-left font-semibold text-green-500
						border-green-400 border-t last:border-b
						flex justify-between'
		>
			{getKeyByValue(operationsMap, operation)}
			<button
				onClick={() => {
					dispatch(fieldsActions.filterFromOperations(index))
					dispatch(transformText())
				}}
			>
				x
			</button>
		</li>
	)
}

export default CurrentOperationCard
