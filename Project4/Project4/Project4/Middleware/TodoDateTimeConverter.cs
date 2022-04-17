using System.Text.Json;
using System.Text.Json.Serialization;

namespace Project4.Middleware
{
    public class TodoDateTimeConverter : JsonConverter<DateTime>
    {
        public override DateTime Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            return reader.GetDateTime().ToUniversalTime();
        }

        public override void Write(Utf8JsonWriter writer, DateTime value, JsonSerializerOptions options)
        {
            value = DateTime.SpecifyKind(value, DateTimeKind.Utc);
            writer.WriteStringValue(value.ToUniversalTime());
        }
    }
}
