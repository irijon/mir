import React from 'react';
import './App.css'
import { cul } from './js'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      date: '',
      summ: '',
      list: [],
      year: '',
      itogList: [],
      button: false,
      otchet: false,
      bal: '',
      otv: ''
    }
  }

  handleChangeDate = (e) => {
    this.setState({ date: e.target.value })
  }

  handleChangeSumm = (e) => {
    this.setState({ summ: e.target.value })
  }

  handleChangeYear = (e) => {
    this.setState({ year: e.target.value })
  }

  handleChangeBal = (e) => {
    this.setState({ bal: e.target.value })
  }

  handleChangeOtv = (e) => {
    this.setState({ otv: e.target.value })
  }

  isNumeric = (num) => {
    return !isNaN(num)
  }

  onSubmit = () => {
    if (this.state.date && this.state.summ && this.isNumeric(this.state.summ)) {
      this.setState({
        date: '',
        summ: '',
        list: [...this.state.list, {
          date: this.state.date,
          summ: this.state.summ,
        }]
      })
    } else {
      alert("Некорректный ввод")
    }
  }

  onItog = () => {
    if (this.state.year && this.isNumeric(this.state.year)) {
      const itogList = cul(this.state.year, this.state.list)
      this.setState({
        itogList,
        button: true
      })
    } else {
      alert("Некорректный год")
    }
  }

  otchet = () => {
    this.setState({
      otchet: !this.state.otchet
    })
  }

  render() {
    return (
      <div className="main-main">
        <div className="main">
          <div className="inputs">
            <div className="label">Дата : <input onChange={this.handleChangeDate} value={this.state.date} type="date"></input></div>
            <div className="label">Сумма : <input onChange={this.handleChangeSumm} value={this.state.summ} type="text"></input></div>
            <div className="label">
              <button onClick={this.onSubmit} className="btn">Добавить</button>
            </div>
          </div>
          <div className="table"></div>

            <div className="button-container">
              {this.state.list.length >= 3 && !this.state.otchet? (<button {...this.state.year ? {} : { disabled: true }} onClick={this.onItog} className="btn">Рассчет</button>) : (<div className={"btn-notdisplay"}></div>)}
              <div className="label" >на : {this.state.otchet ?  "01.01." : ''}<input {...this.state.otchet ? { className: 'dis', disabled: true } : {}} onChange={this.handleChangeYear} value={this.state.year} type="text"></input></div>
              <div className="label" >балансовый счет : <input {...this.state.otchet ? { className: 'dis', disabled: true } : {}} onChange={this.handleChangeBal} value={this.state.bal} type="text"></input></div>
              <div className="label" >исполнитель : <input {...this.state.otchet ? { className: 'dis', disabled: true } : {}} onChange={this.handleChangeOtv} value={this.state.otv} type="text"></input></div>
            </div>
            <div className="table-res">
              <div style={{ borderRight: '1px solid #afafaf' }} className="table-item header">Дата</div>
              <div style={{ borderRight: '1px solid #afafaf' }} className="table-item header">Сумма за день</div>
              <div style={{ borderRight: '1px solid #afafaf' }} className="table-item header">Сумма с начала месяца</div>
              <div className="table-item header">Сумма с начала квартала</div>
              <div style={{ borderLeft: '1px solid #afafaf' }} className="table-item header">Сумма с начала года</div>
            </div>
            <div className="table-res-scroll">
              {this.state.itogList.map((val, i) => (
                <div key={i.toString()} className="table-res anim">
                  <div style={{ borderRight: '1px solid #afafaf' }} className="table-item">{val.date}</div>
                  <div style={{ borderRight: '1px solid #afafaf' }} className="table-item">{val.summ}</div>
                  <div style={{ borderRight: '1px solid #afafaf' }} className="table-item">{val.month} </div>
                  <div className="table-item">{val.quartet} </div>
                  <div style={{ borderLeft: '1px solid #afafaf' }} className="table-item">{val.year}</div>
                </div>
              ))}
              {this.state.itogList == 0 ? (<p style={{ textAlign: 'center', marginTop: '30px' }}>нет данных</p>) : (<></>)}
            </div>
            {this.state.button? <div className="button-container" style={{ marginTop: '30px' }}>
              <button onClick={this.otchet} className="btn">Показать как отчет</button>
            </div> : (<></>)}
          </div>
        </div>
        <div className="aside">
          {/* eslint-disable-next-line eqeqeq*/}
          {this.state.list == 0 ? (<p>Добавьте отчеты</p>) : (this.state.list.map((value, index) => (
            <div className="item" key={index.toString()}>
              <div className="label-right">Дата : <label>{value.date}</label></div>
              <div className="label-right">Сумма : <label>{value.summ}</label></div>
            </div>
          )))}
        </div>
      </div>
    );
  }
}