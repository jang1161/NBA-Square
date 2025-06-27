function Logout() {
  const handleClick = () => {
    localStorage.clear();
    window.location.reload();
  };

  return <button onClick={handleClick}>로그아웃</button>;
}

export default Logout;