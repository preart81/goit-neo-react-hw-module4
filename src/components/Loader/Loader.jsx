import { ThreeDots } from 'react-loader-spinner';
export default function Loader() {
  return (
    <>
      <ThreeDots
        // className="Loader"
        visible={true}
        height="10"
        width="40"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{
          display: 'inline-block',
          paddingLeft: '2px',
        }}
        wrapperClass=""
      />
    </>
  );
}
