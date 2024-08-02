
import './globals.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import "@fortawesome/fontawesome-free/css/all.min.css"
import Navbar from '@/components/Navigation/navigation'
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
};

export default RootLayout;
