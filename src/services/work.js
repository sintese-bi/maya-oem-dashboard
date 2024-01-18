const workercode = () => {
  function getDevices({use_uuid, configRequest}){
  }

  self.onmessage = ({data}) => {
    getDevices(data)
    self.postMessage({
      answer: 42,
    });
  };
}

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"})
const worker_script = URL.createObjectURL(blob);

export default worker_script;