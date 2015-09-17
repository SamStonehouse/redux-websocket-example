export default class Message {
  constructor(data, isRead) {
    this.event_type = data.event_type;
    this.from = data.from
    this.message = data.message;
    this.pet_from = data.pet_from;
    this.pet_to = data.pet_to;
    this.time = data.time;
    this.to = data.to;

    this.read = isRead || false;
  }

  read() {
    this.read = true;
    return this;
  }

}
