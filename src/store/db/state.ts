export interface DBInterface {
  User: {
    name: string,
    balance: string
  }
  Cards:[{
      id: number,
      name: string,
      no: string,
      cvv: string,
      expiry: string,
      status: boolean
  }
  ]
  Transactions: [
    {
      id: number,
      merchant: string,
      net: string,
      time: string,
      amount: string,
      img: string
    }
  ]
}

function state (): DBInterface {
  return {
    User: {
      name: '',
      balance: '0'
    },
    Cards: [
      {
        id: 0,
        name: '',
        no: '',
        cvv: '',
        expiry: '',
        status: true
      }
    ],
    Transactions: [
      {
        id: 0,
        merchant: '',
        net: '',
        time: '',
        amount: '',
        img: ''
      }
    ]
  }
}

export default state
