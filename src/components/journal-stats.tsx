
const JournalStats = ({title, value}:{title: string, value: number}) => {
    return ( 

        <div className="flex items-center justify-between space-x-2">
          <p className="text-lg font-thin">{title}</p>
          <hr className="w-1/2 text-white" />
          <p className="text-lg flex items-center justify-center font-thin h-10 w-10 border rounded-lg">
            {value == 0 ? "-" : value}
          </p>
        </div>
     );
}
 
export default JournalStats;