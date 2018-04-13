# Many examples are from https://learnxinyminutes.com/docs/elixir/
var1 = 876584
IO.puts "Here " <> Integer.to_string(var1)

t1 = {1,2,3}
IO.puts elem(t1,1)

ar1 = [1,2,3]
[head | tail] = ar1
IO.inspect [head,tail]

IO.puts ?a

IO.puts :hello

lower..upper = 1..10 
IO.inspect [lower,upper]

alphas = %{"A" => "a", "B" => "b"}
IO.puts alphas["A"]

betas = %{a: "A", b: "B"}
IO.puts betas.a

IO.puts div(100, 2)
IO.puts 100/2

var2 = {'a','b'}
case var2 do
	{:c, :d} ->
		IO.puts "nah"
    # {'a', x} ->
	{'c', x} ->
    	IO.puts "Second arg can be any"
    _ ->
    	IO.puts "Any-Any"
end

cond do
	1 + 1 == 3 ->
		IO.puts "1 + 1 == 3"
	1 + 2 == 4 ->
		IO.puts "1 + 2 == 4"
	true ->
		IO.puts "true"
end

try do
	throw(:hello)
catch
	message -> IO.puts "message: #{message}."
after
	IO.puts "afterwards"
end

square = fn(x) -> x * x end
IO.puts square.(2)

f = fn
  x, y when x > 0 -> x + y
  x, y -> x * y
end
IO.puts f.(1,2)

defmodule Geometry do
	def area({:rectangle, w, h}) do
		w * h
	end

	def area({:circle, r}) when is_number(r) do
		3.14 * r * r
	end
end
IO.puts Geometry.area({:rectangle, 2, 3})
IO.puts Geometry.area({:circle, 3}) 
IO.inspect Geometry.area({:circle, "not_a_number"})

defmodule Recursion do
  def sum_list([head | tail], acc) do
    sum_list(tail, acc + head)
  end

  def sum_list([], acc) do
    acc
  end
end
IO.puts Recursion.sum_list([1,2,3], 0) #=> 6

IO.inspect Range.new(1,10)
|> Enum.map(fn x -> x * x end)
|> Enum.filter(fn x -> rem(x, 2) == 0 end)

try do
	raise "some error"
rescue
	RuntimeError -> IO.puts "rescued a runtime error"
	_error -> IO.puts "this will rescue any error"
end

defmodule Geometry do
  def area_loop do
    receive do
      {:rectangle, w, h} ->
        IO.puts("Area = #{w * h}")
        area_loop()
      {:circle, r} ->
        IO.puts("Area = #{3.14 * r * r}")
        area_loop()
    end
  end
end

pid = spawn(fn -> Geometry.area_loop() end)

IO.inspect pid
IO.inspect send pid, {:rectangle, 2, 3}
IO.inspect send pid, {:circle, 2}
IO.inspect self()
