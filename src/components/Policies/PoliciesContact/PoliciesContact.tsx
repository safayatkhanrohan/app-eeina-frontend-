interface IContact {
  title: string;
  subtitle: string;
  email: string;
  info?: string;
  bg_color:string
}
export const PoliciesContact = ({title,subtitle,email,info,bg_color}:IContact): JSX.Element => {
  const Email = " info@eeina.com"
  return (
    <div className={`mt-12 p-8 ${bg_color} rounded-2xl`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {title}
                </h2>
            <p className="text-gray-700-300 mb-4">
                {subtitle}
                </p>
         <div className="space-y-2 text-gray-700 ">
            <a
            href={`mailto:${Email}`}>{email} </a>
        </div>
         <div style={{ whiteSpace: "pre-line" }} className="space-y-2 text-gray-700 ">
            <p style={{ whiteSpace: "pre-line" }}>{info } </p>
        </div>
    </div>
  )
}

