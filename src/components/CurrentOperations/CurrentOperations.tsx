import { useAppSelector } from '../../hooks/reduxHooks'
import { getCurrentOperations } from '../../redux/fields-reducer/fields-selector'
import CurrentOperationCard from './CurrentOperationCard/CurrentOperationCard'

const CurrentOperations = () => {
	const currentOperations = useAppSelector(getCurrentOperations)

	const currentOperationNodeList = currentOperations.map((operation: string, index: number) => {
		return <CurrentOperationCard key={operation + index} operation={operation} index={index} />
	})

	return (
		<div className='w-full'>
			<ul>{currentOperationNodeList}</ul>
		</div>
	)
}

export default CurrentOperations
