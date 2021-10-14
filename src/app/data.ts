export interface CustomEvent {
  user_id: number,
  session_id: number,
  event: EventType
}

export interface EventType {
  eventName: string,
  timestamp: number,
  index: number,
  price?: number,
  number_of_items?: number
}

export const events: CustomEvent [] = [ 
  {
    "user_id": 5,
    "session_id": 3,
    "event": {
      "eventName": "python_script_event_2",
      "timestamp": 1634206640,
      "index": 1,
      "price": 200,
      "number_of_items": 1
    }
  },{
    "user_id": 5,
    "session_id": 3,
    "event": {
      "eventName": "python_script_event_3",
      "timestamp": 1636798640,
      "index": 2,
      "price": 50,
      "number_of_items": 1
    }
  },{
    "user_id": 5,
    "session_id": 3,
    "event": {
      "eventName": "python_script_event_4",
      "timestamp": 1634033840,
      "index": 3,
      "price": 40,
      "number_of_items": 1
    }
  },{
    "user_id": 5,
    "session_id": 3,
    "event": {
      "eventName": "python_script_event_5",
      "timestamp": 1631528240,
      "index": 4,
      "price": 150,
      "number_of_items": 2
    }
  },{
    "user_id": 5,
    "session_id": 3,
    "event": {
      "eventName": "C1",
      "timestamp": 1634293040,
      "index": 5,
      "price": 120,
      "number_of_items": 3
    }
  },{
    "user_id": 5,
    "session_id": 3,
    "event": {
      "eventName": "python_script_event_2",
      "timestamp": 1634210240,
      "index": 6,
      "price": 500,
      "number_of_items": 5
    }
  },{
    "user_id": 5,
    "session_id": 3,
    "event": {
      "eventName": "python_script_event_2",
      "timestamp": 1634203040,
      "index": 7,
      "price": 300,
      "number_of_items": 4
    }
  },{
    "user_id": 5,
    "session_id": 3,
    "event": {
      "eventName": "C1",
      "timestamp": 1633947440,
      "index": 8,
      "price": 25,
      "number_of_items": 1
    }
  }
]
