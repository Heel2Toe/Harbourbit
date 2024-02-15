
const PieDescription = ({sentiment, color}: {sentiment: string, color: string}) => {
    return ( 
        <div className="flex items-center space-x-2">
        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color}}/>
        <p className="mb-1 text-sm">{sentiment}</p>
        </div>
     );
}
 
export default PieDescription;








