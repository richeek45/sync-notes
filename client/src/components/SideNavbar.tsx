import { useAtom } from "jotai";
import { Button } from "./ui/button";
import { allDocumentsAtom } from "../utils/atoms";
import { useEffect } from "react";


const SideNavbar = () => {

  const [allDocuments, setAllDocuments] = useAtom(allDocumentsAtom)

  useEffect(() => {
    // fetch('http://localhost:8080/allDocs').then(res => res.json()).then(data => {
    //   console.log(data, 'documents data');
    //   setAllDocuments(data);
    // })
  }, [])

  return (
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Button className="flex items-center gap-2 font-semibold" >
              {/* Should open a dialog to create a new dialog */}
              <span className="">Create New Document</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Button
                variant='outline'
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 bg-gray-100 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              >
                Dashboard
              </Button>
              <Button
                variant='outline'
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                Products
              </Button>
              <Button
                variant='outline'
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                Orders
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">12</Badge> */}
              </Button>
              <Button
                variant='outline'
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                Customers
              </Button>
              <Button
                variant='outline'
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                Settings
              </Button>
            </nav>
          </div>
        </div>
      </div>
  )
} 

export default SideNavbar;