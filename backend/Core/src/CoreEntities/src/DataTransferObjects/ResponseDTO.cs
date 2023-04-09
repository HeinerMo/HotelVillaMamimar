namespace CoreEntities.DataTranferObjects
{
    public class ResponseDTO<T> : MessageDTO
    {
        public T? Item { get; set; }
    }
}
