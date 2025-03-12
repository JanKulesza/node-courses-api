import path from "path";
import os from "os";
import fs from "fs";
import EventEmitter from "events";

type EventArg = {
  id: number;
  url: string;
};

console.log(path.parse(import.meta.dirname));

console.log(os.version());
console.log("Total Memory: ", os.totalmem(), "\n", "Free Memory", os.freemem());

fs.readdir("./", (err, result) => {
  if (err) return null;
  console.log(result);
});

const emitter = new EventEmitter();

emitter.on("message", (arg: EventArg) => {
  console.log("Message!!! ", arg);
});

emitter.emit("message", {
  id: 1,
  url: "url",
} satisfies EventArg);
