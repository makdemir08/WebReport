import './App.css';
import { useEffect, useRef } from 'react'; // useState kaldırılmış
import { DxReportViewer } from 'devexpress-reporting/dx-webdocumentviewer';
import * as ko from 'knockout';
import { ajaxSetup }  from '@devexpress/analytics-core/analytics-utils';





const ReportViewer = ({ year, month, contractTypeId }) => { // props olarak parametreler eklenmiş
  const reportUrl = ko.observable("Offer/50106");
  const viewerRef = useRef();
  
  // requestOption parametreleri props olarak alınan değerlerle güncelleniyor
  const requestOptions = {
    host: "http://10.234.25.40:8207/",
    invokeAction: "DXXRDV",
  };

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI3Yjc2ODJlNy1kZDhlLTRlYjctOTNhZi01ZDQzNzZjNTUwZTYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IkZFMjI2MTQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJtdXN0YWZhLmFrZGVtaXJAZnV6dWxldi5jb20udHIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJNdXN0YWZhIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3VybmFtZSI6IkFLREVNxLBSIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbW9iaWxlcGhvbmUiOiI1MzMyNjI0OTA4IiwiUGFyZW50SWQiOiI5NDM5NTRkZS1hMmUwLTQ5ZTgtOTEzMC05YTU1MGIzOWE4OGMiLCJQcm94eVVzZXJJZCI6IiIsIlRpdGxlIjoiUG9ydGbDtnkgWcO2bmV0aWNpc2kiLCJEZXBhcnRtZW50IjoiRGVuZW1lIiwiQXBwbGljYXRpb25MaXN0IjpbIjNmYTg1ZjY0LTU3MTctNDU2Mi1iM2ZjLTJjOTYzZjY2YWZhNiIsImI0YmEwM2Q4LTc0YjYtNDYxNi1hN2I5LWRjMmIwMzYwZWUyMCJdLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiQWRtaW4uQWRtaW4iLCJBZ2dyZW1lbnQuQ29udHJhY3RBcHByb3ZhbCIsIkFnZ3JlbWVudC5Qb3J0Zm9saW9BcHByb3ZhbCIsIlByb3BlcnRpZXMuQWRkUGhvbmUiLCJEZXBhcnRtZW50LkFkZC5QT1NUIiwiRGVwYXJ0bWVudC5VcGRhdGUuUFVUIiwiSW50ZXJsb2N1dG9yLkFwcHJvdmFsIl0sIlByb3h5VXNlcnMiOlsie1wiSWRcIjpcIjk0Mzk1NGRlLWEyZTAtNDllOC05MTMwLTlhNTUwYjM5YTg4Y1wiLFwiVXNlck5hbWVcIjpcIkZFMjI0MzlcIixcIkdpdmVuTmFtZVwiOlwiXFx1MDBEQ25zYWxcIixcIlN1cm5hbWVcIjpcIkFUQVNPWVwiLFwiVGl0bGVOYW1lXCI6XCJcXHUwMTVFdWJlIE1cXHUwMEZDZFxcdTAwRkNyXFx1MDBGQ1wiLFwiSXNQcm94eVwiOmZhbHNlfSIsIntcIklkXCI6XCIzZTIxMDljMC05NWRiLTRhODItYTg1ZC03YTg2ODBhOTdkM2FcIixcIlVzZXJOYW1lXCI6XCJGRTIyMzI0XCIsXCJHaXZlbk5hbWVcIjpcIlxcdTAxNUVleW1hbnVyXCIsXCJTdXJuYW1lXCI6XCJNVVNUQUZBT1xcdTAxMUVMVVwiLFwiVGl0bGVOYW1lXCI6XCJQb3J0ZlxcdTAwRjZ5IFlcXHUwMEY2bmV0aWNpc2lcIixcIklzUHJveHlcIjpmYWxzZX0iLCJ7XCJJZFwiOlwiYTBhNmQ3YTctODQwNy00OTE2LWI1MWEtNGVhMzliYjNjYTkyXCIsXCJVc2VyTmFtZVwiOlwiRkUyMDI3MVwiLFwiR2l2ZW5OYW1lXCI6XCJFcmVuXCIsXCJTdXJuYW1lXCI6XCJFUlNPWVwiLFwiVGl0bGVOYW1lXCI6XCJQb3J0ZlxcdTAwRjZ5IFlcXHUwMEY2bmV0aWNpc2lcIixcIklzUHJveHlcIjpmYWxzZX0iLCJ7XCJJZFwiOlwiYTYzYTc4NDktYzViZS00YTEwLWI5MWYtMjkzMmQwYWIzNGJmXCIsXCJVc2VyTmFtZVwiOlwiRkUyMjc4NVwiLFwiR2l2ZW5OYW1lXCI6XCJBbGl5ZVwiLFwiU3VybmFtZVwiOlwiXFx1MDEzMERSXFx1MDEzMFNcIixcIlRpdGxlTmFtZVwiOlwiUG9ydGZcXHUwMEY2eSBZXFx1MDBGNm5ldGljaXNpXCIsXCJJc1Byb3h5XCI6ZmFsc2V9Il0sImV4cCI6MTcxMDkyODU0MiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNTcvIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NDQzNTcvIn0.fpHZvvCd4TCDR93mm5rmSgGXLElkFLyWhJCNy11M7YQ';
  console.log(requestOptions);
  useEffect(()=>{
    ajaxSetup.ajaxSettings = { headers: { 'Authorization': 'Bearer ' +token} };  
  },[]);
  useEffect(() => {
    const viewer = new DxReportViewer(viewerRef.current, { reportUrl, requestOptions });
    viewer.render(); 
    return () => viewer.dispose();
  }, [year, month, contractTypeId]); // useEffect dependency listesine propslar eklenmiş

  return (<div ref={viewerRef}></div>);
}

function App() {
  return (
    <div style={{ width: "100%", height: "1000px" }}>
      <ReportViewer /> 
    </div>
  );
}

export default App;