import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState<string>('');
  const webSocket = new WebSocket('ws://localhost:8080'); // 서버 연결

  // 웹 소켓 메세지 수신
  webSocket.onmessage = function (event) {
    alert(event.data);
  };

  // 웹 소켓 연결 종료
  webSocket.onclose = function () {
    alert('웹소켓 서버와 연결이 종료되었습니다.');
  };

  // 오류 발생
  webSocket.onerror = function (error) {
    console.log(error);
  };

  const sendMessage = (e: any) => {
    e.preventDefault();
    webSocket.send(message);
  };

  const onChangeMessage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    // 웹 소켓 연결 이벤트
    webSocket.onopen = function () {
      alert('웹소켓 서버와 연결에 성공했습니다.');
    };
  }, []);
  return (
    <form>
      <input type="text" id="message" value={message} onChange={onChangeMessage} />
      <button type="submit" onClick={sendMessage}>
        전송
      </button>
    </form>
  );
}

export default App;
