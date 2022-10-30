import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getCurrentOperations } from '../../redux/fields-reducer/fields-selector'
import { fieldsActions, transformText } from '../../redux/fields-reducer/fields-reducer'

import CurrentOperationCard from './CurrentOperationCard/CurrentOperationCard'
import NameHeader from '../common/NameHeader/NameHeader'
import trashBin from '../../assets/trash-bin.png'

const CurrentOperations = () => {
  const currentOperations = useAppSelector(getCurrentOperations)
  const dispatch = useAppDispatch()

  const currentOperationNodeList = currentOperations.map(({ type }, index) => {
    return <CurrentOperationCard key={type + index} index={index} />
  })

  return (
    <div className='w-full overflow-y-scroll'>
      <NameHeader text='Recipe' extraStyles='flex justify-between'>
        <img
          className='h-6 w-6 hover:cursor-pointer'
          src={trashBin}
          alt='delete all'
          onClick={() => {
            dispatch(fieldsActions.resetOperations())
            dispatch(transformText())
          }}
        />
      </NameHeader>
      <ul>{currentOperationNodeList}</ul>
    </div>
  )
}

export default CurrentOperations
