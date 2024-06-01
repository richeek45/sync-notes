import { useAtom } from "jotai";
import { Button } from "./ui/button";
import { allDocumentsAtom } from "../utils/atoms";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SideNavbar = () => {
  const [allDocuments, setAllDocuments] = useAtom(allDocumentsAtom)
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/allDocs').then(res => res.json()).then(data => {
      console.log(data, 'documents data');
      setAllDocuments(data);
    })
  }, [])

  return (
      <div className="hidden border-r overflow-hidden py-10 h-full min-w-36  bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Button className="flex items-center gap-2 font-semibold" >
              {/* Should open a dialog to create a new dialog */}
              <span className="">Create New Document</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium">
              {allDocuments?.map(doc => (
                <Button
                  key={doc.id}
                  variant='outline'
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-gray-900 bg-gray-100 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                  onClick={() => {
                    navigate(`/`);
                    setTimeout(() => {
                      navigate(`/document/${doc.title}`);
                    }, 500)
                  }}
                >
                  {doc.title}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>
  )
} 

export default SideNavbar;