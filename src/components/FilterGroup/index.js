import './index.css'

const FilterGroup = props => {
  const {
    salaryRangesList,
    employmentTypesList,
    checkBoxChange,
    radioButtonChange,
    radioButtonInput,
    EmployerEvents,
  } = props

  const handleCheckBoxChange = event => {
    const {id, checked} = event.target
    const updatedObject = {
      [id]: checked,
    }
    checkBoxChange(updatedObject)
  }
  const handleOptionChange = event => {
    radioButtonChange(event.target.value)
  }

  return (
    <div className="filter-group-container">
      <hr className="horizon-filter" />
      <div className="employment-type">
        <h1 className="employ-head">Type of Employment</h1>
        <ul>
          {employmentTypesList.map(each => (
            <li key={each.employmentTypeId} className="employment-type-element">
              <input
                type="checkbox"
                checked={EmployerEvents[`${each.employmentTypeId}`]}
                id={each.employmentTypeId}
                className="checkbox-input"
                onChange={handleCheckBoxChange}
              />
              <label className="checkbox-label" htmlFor={each.employmentTypeId}>
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <hr className="horizon-filter" />
      <div className="employment-type">
        <h1 className="employ-head">Salary Range</h1>
        <ul>
          {salaryRangesList.map(each => (
            <li key={each.salaryRangeId} className="employment-type-element">
              <input
                type="radio"
                id={each.salaryRangeId}
                className="checkbox-input"
                value={each.salaryRangeId}
                checked={each.salaryRangeId === radioButtonInput}
                onChange={handleOptionChange}
              />
              <label className="checkbox-label" htmlFor={each.salaryRangeId}>
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default FilterGroup
