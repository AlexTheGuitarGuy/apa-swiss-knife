import { FC } from 'react'
import { getKeyByValue } from '../../../utils/object-helpers'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import {
  fieldsActions,
  transformText,
  Operation,
} from '../../../redux/fields-reducer/fields-reducer'
import { getOperationsMap } from '../../../redux/fields-reducer/fields-selector'

type CurrentOperationCardProps = {
  operation: Operation
  index: number
}
const CurrentOperationCard: FC<CurrentOperationCardProps> = ({
  operation: { type, key, keyed },
  index,
}) => {
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
      <div className='my-auto'>
        {getKeyByValue(keyed ? operationsMap.keyed : operationsMap.keyless, type)}
      </div>
      {keyed && (
        <input
          placeholder='Key'
          className='focus:outline-gray-400 px-4 py-2 border border-gray-300 text-gray-700'
          value={key}
          onChange={(event) => {
            dispatch(fieldsActions.updateKey(index, event.target.value))
            dispatch(transformText())
          }}
        />
      )}
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
