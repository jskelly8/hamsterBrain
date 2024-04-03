import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

function Planner() {
  const data = [
    {
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2024, 1, 15, 1, 0),
      EndTime: new Date(2027, 1, 15, 12, 30),
    },
  ];

  return (
    <div className="Schedule-container">
    <ScheduleComponent
      selectedDate={new Date(2024, 3, 10)}
      eventSettings={{
        dataSource: data,
      }}
    >
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
    </div>
  );
  }
  export default Planner;