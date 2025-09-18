import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export function DropDownMarket() {


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Time</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuCheckboxItem onChange={(e) => {
          console.log(e.target);
        }}>
          Status Bar
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
