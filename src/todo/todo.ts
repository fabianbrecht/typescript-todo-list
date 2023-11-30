import uuid4 from "uuid4";

export default class Todo {
  checked: boolean = false;
  headline: string = "Do something important";
  text: string = "Click the text or the headline to edit this todo";
  uuid: string = uuid4();
}
